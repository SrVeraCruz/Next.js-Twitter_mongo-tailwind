import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import People from "../people/People";

export default function WhoToFollow() {
  const {userInfo, status} = useUserInfo()
  const [peoples, setPeoples] = useState([])

  const fetchPeoples = async () => {
    if(!userInfo?._id) {
      return
    }
    await axios.get('/api/users?userId='+userInfo?._id)
      .then(res => {
        setPeoples(res.data.usersDoc)
      })
      .catch(err => {
        console.error(err.data)
      })
  }
  useEffect(() => {
    fetchPeoples()
  }, [userInfo?._id])

  return (
    <aside className="flex-1 m-4 md:hidden">
      <div className="border border-twitterBorder p-4 rounded-xl">
        <h1 className="text-lg font-bold text-nowrap">Who to follow</h1>

          <div className="flex flex-col gap-4 mt-4">
            {!!peoples.length && peoples.map((user) => (
              <div key={user._id}>
                <People user={user} />
              </div>
            ))}
            {!peoples.length && (
              <span className="text-twitterLightGray">
                No peoples
              </span>
            )}
          </div>
      </div>
    </aside>
  )
}