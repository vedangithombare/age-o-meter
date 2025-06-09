function MainAge() {
  return (
    <>
      <div className="flex flex-col justify-center  items-center min-h-screen p-4">
        <div className="flex flex-col  p-6 gap-6 bg-white h-auto w-full rounded-3xl justify-between rounded-br-[25vw] md:gap-4  lg:p-[2dvw] md:rounded-br-[8vw] md:w-[46dvw] ">
          <div className="flex flex-row w-full justify-between md:justify-start md:gap-14 lg:gap-20 md:p-10">
            <div className="flex flex-col gap-2">
              <span>DAY</span>
              <span className="border border-gray-300 p-3">23</span>
            </div>

            <div className="flex flex-col gap-2">
              <span>MONTH</span>
              <span className="border border-gray-300 p-3">23</span>
            </div>

            <div className="flex flex-col gap-2">
              <span>YEAR</span>
              <span className="border border-gray-300 p-3">23</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center md:justify-end">
            <div className="absolute w-full h-px bg-gray-200 "></div>
            <button className="z-10 w-12 h-12 p-3 rounded-full flex items-center justify-center cursor-pointer bg-[hsl(259,100%,65%)] hover:bg-black lg:w-16 lg:h-16">
              <img src="/assets/icon-arrow.svg" alt="arrow icon" />
            </button>
          </div>

          <div className="flex flex-col items-start font-bold gap-6 text-5xl lg:gap-6 lg:text-6xl md:p-6">
            <span>
              {" "}
              <span className="text-[#854dff]">22</span> Years
            </span>
            <span>
              <span className="text-[#854dff]">2</span> Months
            </span>
            <span>
              <span className="text-[#854dff]">22</span> Days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainAge;
