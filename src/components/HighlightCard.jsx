const HighlightCard = (props) => {
  const { title, stat, unit, direction } = props;

  const showFooter = (type) => {
    switch (type) {
      case 'Humidity':
        return (
          <div className="progress-wrapper">
            <label
              htmlFor="humidity"
              className="flex justify-between items-center w-full"
            >
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </label>
            <progress id="humidity" max="100" value={stat}></progress>
            <span>%</span>
          </div>
        );
      case 'Wind Status':
        return (
          <div className="flex items-center space-x-5 justify-center">
            <div className="rounded-full w-12 h-12 wind-wrapper flex items-center justify-center">
              <span
                className={`material-icons ${direction.toLowerCase()} navigation`}
              >
                navigation
              </span>
            </div>
            <span className="wind-direction">{direction}</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card__highlight py-10 px-20">
      <div className="card__highlight--details text-center space-y-10">
        <h3>{title}</h3>
        <h2>
          {stat}
          <span> {unit}</span>
        </h2>
        {showFooter(title)}
      </div>
    </div>
  );
};

export default HighlightCard;
