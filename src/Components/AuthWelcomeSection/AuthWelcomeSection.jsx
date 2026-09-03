import signup_bg from '../../assets/signup-bg.png'
import avatar from '../../assets/alex-avatar.png'

export default function AuthWelcomeSection({signup_page}) {
  return <>
  
    {/* left side layout */}
    <div className="w-full lg:w-1/2 sm:w-full min-h-[700px] bg-cover bg-center" style={{backgroundImage: `url(${signup_bg})` }}>
  <div className="w-full h-full bg-blue-600/75">
    <div className='p-10 text-white'>
        <div className={`flex gap-2 ${signup_page?'mb-[60px]':'mb-[20px]'}`}>
            <span className='w-[48px] h-[48px] text-lg/4 font-bold bg-[#ffffff66] border border-white rounded-xl flex justify-center items-center'>S</span>
            <span className='font-bold text-3xl text-white flex items-center'>SocialHub</span>
        </div>
        {/* ========================================================================================= */}
        <div>
          <h1 className='text-4xl sm:text-5xl font-bold mb-[10px]'><span className='capitalize'>{signup_page?'Connect Width':'welcome back'} </span><span className='text-sky-300 block'>{signup_page?'amazing people':'to socialHub App'}</span></h1>
          <p className='mt-[20px] mb-[30px]'>{signup_page?"Join millions of users sharing moments, ideas, and building meaningful connections every day":"Signin to connect people all over the world"}</p>
        </div>
        {/* ========================================================================================== */}
        <div className='grid lg:grid lg:grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4 text-base mb-[30px]'>
          <div className='flex gap-2 border border-solid border-amber-50 rounded-lg bg-indigo-300/60 p-3'>
            <div className='w-[40px] h-[40px] rounded-lg bg-green-500/40 flex justify-center items-center'><i className="fa-solid fa-message"></i></div>
            <div>
              <h2 className='text-base'>Real-time Chat</h2>
              <p className='text-base'>Instant messaging</p>
            </div>
          </div>
          <div className='flex gap-2 border border-solid border-amber-50 rounded-lg bg-indigo-300/60 p-3'>
            <div className='w-[40px] h-[40px] rounded-lg bg-blue-500/40 flex justify-center items-center'><i className="fa-solid fa-image"></i></div>
            <div>
              <h2 className='text-base'>Share Media</h2>
              <p className='text-base'>Photos & videos</p>
            </div>
            
          </div>
          <div className='flex gap-2 border border-solid border-amber-50 rounded-lg bg-indigo-300/60 p-3'>
            <div className='w-[40px] h-[40px] rounded-lg bg-indigo-500/40 flex justify-center items-center'><i className="fa-solid fa-bell"></i></div>
            <div>
              <h2 className='text-base'>Smart Alerts</h2>
              <p className='text-base'>Stay updated</p>
            </div>
            
          </div>
          
          <div className='flex gap-2 border border-solid border-amber-50 rounded-lg bg-indigo-300/60 p-3'>
            <div className='w-[40px] h-[40px] rounded-lg bg-green-500/40 flex justify-center items-center'><i className="fa-solid fa-users"></i></div>
            <div>
              <h2 className='text-base font-normal'>Communities</h2>
              <p className='text-base font-normal'>Find your tribe</p>
            </div>
            
          </div>
        </div>

        {/*========================================================================= */}
        <div className='flex gap-4 mb-[60px]'>
          <div>
            <div className='flex gap-2 text-2xl font-bold items-center'>
              <i className="fa-solid fa-users text-base"></i>
              <span>2M+</span>
            </div>
            <p className='font-normal'>Active Users</p>
          </div>
          <div>
            <div className='flex gap-2 text-2xl font-bold items-center'>
              <i className="fa-solid fa-heart text-base"></i>
              <span>10M+</span>
            </div>
            <p className='font-normal'>Posts Shared</p>
          </div>
          <div>
            <div className='flex gap-2 text-2xl font-bold items-center'>
              <i className="fa-solid fa-message text-base"></i>
              <span>50M+</span>
            </div>
            <p className='font-normal'>Messages Sent</p>
          </div>
          </div>
          {/* ================================================================================== */}
        <div className='bg-indigo-300/60 text-amber-50 p-[20px] border-1 border-solid border-amber-50 rounded-xl'>
        <div className='text-yellow-300'>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <p className='pt-[15px] pb-[20px] text-lg italic font-medium'>"SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!"</p>
      <div className='flex gap-2'>
          <div className='w-[50px] h-[50px] rounded-[50%]'>
            <img src={avatar} alt="Alex" className='w-full h-full rounded-[50%]'/>
          </div>
          <div> 
            <h3 className='italic font-semibold'>Alex Johnson</h3>
            <p>Product Designer</p>
          </div>
        
      </div>
    </div>
    {/* ============================================================================= */}
    </div>
    

  </div>
   
  </div>

  {/* Outlet */}
  {/* <div className='w-1/2'>
     <Outlet/>
  </div> */}
 
  {/* </div> */}
  
  </>
}

