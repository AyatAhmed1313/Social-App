// // import { useQueries } from "@tanstack/react-query";
// import axios from "axios";
// import { AiFillLike } from "react-icons/ai";
// import { IoIosCloseCircle } from "react-icons/io";
// import CommentsSkeletonList from "../CommentsLoadingSkeleton/CommentsSkeletonList";
// import { useNavigate } from "react-router-dom";
// import { headerObject } from "@/headerObject/headerObject";
// import { useQueries } from "@tanstack/react-query";
// import { useState } from "react";
// import UserInfoCard from "../UserInfoCard/UserInfoCard";

// export default function ShowLikesCard({
//   setShowLikes,
//   likesNum,
//   likes,
// })

// {
//   const [showCard, setShowCard] = useState(false);
//   const navigate = useNavigate();

//   async function getUserProfile(userId) {
//     try {
//       const { data } = await axios.get(
//         `https://route-posts.routemisr.com/users/${userId}/profile`,
//         headerObject
//       );
//       console.log(`user Data from showLikeCard :`,data)

//       return data;
//     } catch (err) {
//       if (err.response?.data?.message === "jwt expired") {
//         localStorage.removeItem("token");
//         navigate("/");
//       }

//       throw err;
//     }
//   }

//   const usersData = useQueries({
//     queries: likes.map((id) => ({
//       queryKey: ["like-user", id],
//       queryFn: () => getUserProfile(id),
//     })),
//   });

//   return (
//     <div className="w-full h-screen absolute top-0 left-0 z-50 bg-slate-300/70 flex justify-center items-center">
//       {/* Card */}
//       <div className="w-[50%] min-h-[400px] max-h-[90vh] overflow-y-auto bg-white shadow-[12px_12px_48px_rgba(0,0,0,0.25)] rounded-xl p-6">
//         {/* Header */}
//         <div className="flex justify-between mb-5">
//           <div className="flex items-center w-[50px] h-[40px] border-b-4 border-blue-600">
//             <div className="size-6 rounded-full bg-blue-600 flex justify-center items-center me-1">
//               <AiFillLike className="text-white text-sm" />
//             </div>

//             <p className="text-blue-600 font-medium">{likesNum}</p>
//           </div>

//           <IoIosCloseCircle
//             size={40}
//             onClick={() => setShowLikes(false)}
//             className="text-slate-400 cursor-pointer"
//           />
//         </div>

//         {/* Users */}

//         {usersData.map((user, index) => (
//           <div key={likes[index]}>
//             {user.isLoading ? (
//               <CommentsSkeletonList num={1} />
//             ) : user.isError ? (
//               <p>Something went wrong</p>
//             ) : (
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                   <div   className="h-fit">
//                     {showCard && <UserInfoCard/>}
//                     <img
//                       className="size-[50px] rounded-full"
//                       src={user?.data?.data?.user?.photo}
//                       alt={user?.data?.data?.user?.name}
//                       onMouseEnter={() => {
//                         console.log('enter')
//                         setShowCard(true)
//                     }}
//                      onMouseLeave={() => {
//                         console.log("leave")
//                         setShowCard(false)
//                     }}
//                     />

//                     <div className="relative size-[20px] left-[30px] bottom-[15px] rounded-full bg-blue-600">
//                       <AiFillLike className="text-white text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-lg font-medium">
//                   {user?.data?.data?.user?.name}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { headerObject } from "@/headerObject/headerObject.js";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import CommentsSkeletonList from "../CommentsLoadingSkeleton/CommentsSkeletonList";
import UserInfoCard from "../UserInfoCard/UserInfoCard";

export default function ShowLikesCard({
  setShowLikes,
  likesNum,
  likes,
}) {
  const navigate = useNavigate();

  const [hoveredUserId, setHoveredUserId] = useState(null);

  async function getUserProfile(userId) {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${userId}/profile`,
        headerObject
      );

      return data;
    } catch (err) {
      if (err.response?.data?.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }

      throw err;
    }
  }

  const usersData = useQueries({
    queries: likes.map((id) => ({
      queryKey: ["like-user", id],
      queryFn: () => getUserProfile(id),
    })),
  });

  return (
    <div className="w-full h-screen absolute top-0 left-0 z-50 bg-slate-300/70 flex justify-center items-center">
      <div className="w-[50%] min-h-[400px] max-h-[90vh] overflow-y-auto bg-white shadow-[12px_12px_48px_rgba(0,0,0,0.25)] rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between mb-5">
          <div className="flex items-center w-[50px] h-[40px] border-b-4 border-blue-600">
            <div className="size-6 rounded-full bg-blue-600 flex justify-center items-center me-1">
              <AiFillLike className="text-white text-sm" />
            </div>

            <p className="text-blue-600 font-medium">{likesNum}</p>
          </div>

          <IoIosCloseCircle
            size={40}
            onClick={() => setShowLikes(false)}
            className="text-slate-400 cursor-pointer"
          />
        </div>

        {/* Users */}
        {usersData.map((user, index) => {
          if (user.isLoading) {
            return <CommentsSkeletonList key={likes[index]} num={1} />;
          }

          if (user.isError) {
            return (
              <p key={likes[index]} className="text-red-500">
                Something went wrong
              </p>
            );
          }

          const currentUser = user.data.data.user;

          return (
            <div
              key={currentUser._id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <div
                  className="relative h-fit"
                  onMouseEnter={() => setHoveredUserId(currentUser._id)}
                  onMouseLeave={() => setHoveredUserId(null)}
                >
                  {hoveredUserId === currentUser._id && (
                    <div className="absolute left-[-150px] top-[-150px] z-50">
                      <UserInfoCard user={currentUser} />
                    </div>
                  )}

                  <img
                    className="size-[50px] rounded-full cursor-pointer"
                    src={currentUser.photo}
                    alt={currentUser.name}
                  />

                  <div className="absolute left-[30px] bottom-0 size-[20px] rounded-full bg-blue-600">
                    <AiFillLike className="text-white text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <p className="text-lg font-medium">
                {currentUser.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}