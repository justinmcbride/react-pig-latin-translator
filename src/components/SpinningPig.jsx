const SpinningPig = ({ pigSpinSpeed = 0 }) => {
  return (
    <img
    className="animate-spin animate-infinite animate-duration-[20000ms] max-w-80 h-auto pointer-events-none"
    src="/LargePig.png"
    alt="This piggy went to market"
  />
)
};

export default SpinningPig;
