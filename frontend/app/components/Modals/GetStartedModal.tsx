// "use client";

// import { FcGoogle } from "react-icons/fc";
// import { FaApple, FaFacebookF } from "react-icons/fa";
// import { useEffect } from "react";
// import { HiOutlineMail } from "react-icons/hi";
// import { useRouter } from "next/navigation";

// type GetStartedModalProps = {
//     open: boolean;
//     onClose: () => void;
// };

// export default function GetStartedModal({
//     open,
//     onClose,
// }: GetStartedModalProps) {
//     const router = useRouter();
//     useEffect(() => {
//         if (open) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "auto";
//         }
//         return () => {
//             document.body.style.overflow = "auto";
//         };
//     }, [open]);
//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white p-4">

//             {/* Modal */}
//             <div
//                 className="
//           relative
//           w-full
//           max-w-[748px]
//           min-h-[660px]
//           overflow-hidden
//           rounded-[10px]
//           border border-gray-200
//           shadow-2xl
//           px-6
//           py-10
//           sm:px-12
//           md:px-20
//         "
//             >

//           <button
//             onClick={onClose}
//             className="
//             absolute
//             right-6
//             top-6
//             flex
//             h-[34px]
//             w-[34px]
//             items-center
//             justify-center
//             rounded-full
//             bg-[#E3E7EB]
//             text-[24px]
//             font-medium
//             text-[#7B8794]
//           "
//                 >
//                     ×
//                 </button>

//                 {/* Heading */}
//                 <h2
//                     className="
//             mt-[82px]
//             text-center
//             text-[24px]
//             font-bold
//             leading-tight
//             text-[#002C48]
//             sm:text-[32px]
//           "
//                 >
//                     Get started with Teloa
//                 </h2>

//                 {/* Buttons */}
//                 <div
//                     className="
//             mx-auto
//             mt-10
//             flex
//             w-full
//             max-w-[400px]
//             flex-col
//             gap-4
//           "
//                 >

//                     {/* Google */}
//                     <button
//                         className="
//               flex
//               h-[48px]
//               items-center
//               gap-5
//               rounded-full
//               border
//               border-[#8EA2B5]
//               bg-white
//               px-7
//               text-[16px]
//               font-semibold
//               text-[#002C48]
//               transition-all
//               duration-200
//               hover:bg-[#f5f7f9]
//             "
//                         onClick={() => {
//                             onClose();
//                             router.push("/dashboard/send-refill");
//                         }}
//                     >
//                         <FcGoogle size={22} />
//                         Continue with Google
//                     </button>

//                     {/* Apple */}
//                     <button
//                         className="
//                flex
//               h-[48px]
//               items-center
//               gap-5
//               rounded-full
//               border
//               border-[#8EA2B5]
//               bg-white
//               px-7
//               text-[16px]
//               font-semibold
//               text-[#002C48]
//               transition-all
//               duration-200
//               hover:bg-[#f5f7f9]
//             "
//                         onClick={() => {
//                             onClose();
//                             router.push("/dashboard");
//                         }}
//                     >
//                         <FaApple size={22} />
//                         Continue with Apple
//                     </button>

//                     {/* Facebook */}
//                     <button
//                         className="
//                flex
//               h-[48px]
//               items-center
//               gap-5
//               rounded-full
//               border
//               border-[#8EA2B5]
//               bg-white
//               px-7
//               text-[16px]
//               font-semibold
//               text-[#002C48]
//               transition-all
//               duration-200
//               hover:bg-[#f5f7f9]
//             "
//                         onClick={() => {
//                             onClose();
//                             router.push("/dashboard");
//                         }}
//                     >
//                         <FaFacebookF
//                             size={22}
//                             className="rounded-full bg-[#1877F2] p-1 text-white"

//                         />
//                         Continue with Facebook
//                     </button>

//                     {/* Email */}
//                     <button
//                         className="
//                flex
//               h-[48px]
//               items-center
//               gap-5
//               rounded-full
//               border
//               border-[#8EA2B5]
//               bg-white
//               px-7
//               text-[16px]
//               font-semibold
//               text-[#002C48]
//               transition-all
//               duration-200
//               hover:bg-[#f5f7f9]
//             "
//                         onClick={() => {
//                             onClose();
//                             router.push("/dashboard");
//                         }}
//                     >
//                         <HiOutlineMail size={22} />
//                         Continue with Email
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }