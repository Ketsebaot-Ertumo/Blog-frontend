// import { Fragment, useState } from 'react'
// import { Link } from 'react-router-dom'

// const profile = ({ userProfile }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="text-gray-800 font-bold text-xl">
//               Blog Platform
//             </Link>
//           </div>
//           <div className="flex items-center">
//             {userProfile && (
//               <Fragment>
//                 <div className="hidden sm:block">
//                   <img
//                     src={userProfile.profilePicture}
//                     alt="Profile"
//                     className="h-8 w-8 rounded-full"
//                   />
//                   <Link
//                     to={`/users/${userProfile.id}`}
//                     className="ml-3 text-gray-800 hover:text-gray-600 font-medium"
//                   >
//                     {userProfile.name}
//                   </Link>
//                 </div>
//                 <div className="ml-4 relative sm:hidden">
//                   <button
//                     onClick={toggleDropdown}
//                     className="flex text-gray-800 hover:text-gray-600 items-center focus:outline-none"
//                   >
//                     <img
//                       src={user.profilePicture}
//                       alt="Profile"
//                       className="h-8 w-8 rounded-full"
//                     />
//                   </button>
//                   {isDropdownOpen && (
//                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                       <div
//                         className="py-1"
//                         role="menu"
//                         aria-orientation="vertical"
//                         aria-labelledby="user-menu"
//                       >
//                         <Link
//                           to={`/users/${user.id}`}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                           role="menuitem"
//                         >
//                           Profile
//                         </Link>
//                         <button
//                           onClick={logout}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
//                           role="menuitem"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </Fragment>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default profile