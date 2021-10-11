import Clear from '../assets/Clear.png';
import Hail from '../assets/Hail.png';
import HeavyCloud from '../assets/HeavyCloud.png';
import HeavyRain from '../assets/HeavyRain.png';
import LightCloud from '../assets/LightCloud.png';
import LightRain from '../assets/LightRain.png';
import Shower from '../assets/Shower.png';
import Sleet from '../assets/Sleet.png';
import Snow from '../assets/Snow.png';
import Thunderstorm from '../assets/Thunderstorm.png';

export const showIcon = (weather) => {
  switch (weather) {
    case 'Heavy Rain':
      return HeavyRain;

    case 'Snow':
      return Snow;

    case 'Sleet':
      return Sleet;

    case 'Hail':
      return Hail;

    case 'Thunderstorm':
      return Thunderstorm;

    case 'Light Rain':
      return LightRain;

    case 'Showers':
      return Shower;

    case 'Heavy Cloud':
      return HeavyCloud;

    case 'Light Cloud':
      return LightCloud;

    case 'Clear':
      return Clear;

    default:
      return Clear;
  }
};
