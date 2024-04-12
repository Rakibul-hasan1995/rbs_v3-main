import { GiCircleClaws, GiCirclingFish } from "react-icons/gi";

const Loading = () => {
   return (
      <div aria-label="Loading..." role="status" className="flex items-center space-x-8 shadow-md fixed top-1/2 left-1/2 backdrop-blur-sm p-3 px-10 rounded-md">

         {/* <GiCircleClaws className="w-16 h-16 animate-spin" /> */}
         <div className="w-12 h-12 border-4 border-blue-600 rounded-md animate-spin " />
         <span className="text-4xl font-medium">Loading...</span>
      </div>
   )
}
export default Loading