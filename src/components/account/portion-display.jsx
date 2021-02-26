import { ReactComponent as UnfilledCircle } from '../../assets/images/unfilled-circle.svg'
import { ReactComponent as FilledCircle } from '../../assets/images/filled-circle.svg'

const PortionDisplay = ({ portion = 0 }) => {

  return (
    <div className="flex justify-between mt-4">
      <div className="flex relative align-center w-1/3">
        <div className="z-10">
          {portion > 0 ? <FilledCircle className="rounded-full  h-5 w-5" />
          : <UnfilledCircle className="rounded-full  h-5 w-5" />
          }
          25%
        </div>
        <div
          className={`-ml-px w-full h-0.5 top-2.5 left-0.5 absolute ${
            portion > 25 ? "bg-primary" : "bg-gray-300"
          } `}
          aria-hidden="true"
        />
      </div>

      <div className="flex relative align-center w-1/3">
        <div className="z-10">
          {portion >= 26 ? (
            <FilledCircle className="rounded-full  h-5 w-5" />
          ) : (
            <UnfilledCircle className="rounded-full  h-5 w-5" />
          )}
            {portion > 25 && portion < 100 ? portion : 50}%
        </div>
        <div
          className={`-ml-px w-full h-0.5 top-2.5 left-0.5 absolute ${
            portion >= 100 ? "bg-primary" : "bg-gray-300"
          }`}
          aria-hidden="true"
        />
      </div>

      <div className="flex relative align-center w-1/3">
        <div className="z-10">
          {portion >= 100 ? (
            <FilledCircle className="rounded-full  h-5 w-5" />
          ) : (
            <UnfilledCircle className="rounded-full  h-5 w-5" />
          )}
          100%
        </div>
        <div
          className={`-ml-px w-full h-0.5 top-2.5 left-0.5 absolute ${
            portion > 100 ? "bg-primary" : "bg-gray-300"
          }`}
          aria-hidden="true"
        />
      </div>

      <div className="flex relative align-center w-1/3">
        <div className="z-10">
          {portion > 100 ? (
            <FilledCircle className="rounded-full  h-5 w-5" />
          ) : (
            <UnfilledCircle className="rounded-full  h-5 w-5" />
          )}
          100%+
        </div>
      </div>
    </div>
  );
};

export default PortionDisplay;
