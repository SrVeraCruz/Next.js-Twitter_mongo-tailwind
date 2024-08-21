import useUserInfo from "../../hooks/useUserInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import People from "../people/People";
import Spinner from "../spinner/Spinner";

export default function WhoToFollow({
  explore=false
}) {
  const {userInfo, status} = useUserInfo()
  const [peoples, setPeoples] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPeoples = async () => {
    if(!userInfo?._id) {
      return
    }
    const endpoint = `/api/users?userId=${userInfo?._id}&explore=${explore ? '1' : '0'}`
    await axios.get(endpoint)
      .then(res => {
        setPeoples(res.data.usersDoc)
      })
      .catch(err => {
        console.error(err.data)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchPeoples()
  }, [userInfo?._id])

  return (
    <div className={`flex-1 ${explore ? '' : 'lg:hidden m-4'}`}>
      <div className={`p-4 border-twitterBorder ${explore ? 'border-b' : 'border rounded-xl'}`}>
        <h1 className="text-lg font-bold text-nowrap">Who to follow</h1>

          <div className="flex flex-col gap-4 mt-4">
            {!!peoples.length && peoples.map((profileInfo) => (
              <div key={profileInfo._id}>
                <People 
                  profileInfo={profileInfo} 
                  userId={userInfo?._id}
                />
              </div>
            ))}
            {isLoading ? (
              <div className="flex items-center justify-center ">
                <Spinner />
              </div>
            ): !peoples.length && (
              <span className="text-twitterLightGray">
                No peoples
              </span>
            )}
          </div>
      </div>
    </div>
  )
}