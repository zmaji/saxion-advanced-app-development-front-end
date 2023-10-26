export const getMockImage = (name: string) => {
  let image;

  switch (name) {
    case 'education-and-information-1':
      image = require(`../../assets/images/education-and-information-1.jpg`);
      break;
    case 'education-and-information-2':
      image = require(`../../assets/images/education-and-information-2.jpg`);
      break;
    case 'flight-activities-1':
      image = require(`../../assets/images/flight-activities-1.jpg`);
      break;
    case 'flight-activities-2':
      image = require(`../../assets/images/flight-activities-2.jpg`);
      break;
    case 'flight-activities-3':
      image = require(`../../assets/images/flight-activities-3.jpg`);
      break;
    case 'mindfulness-1':
      image = require(`../../assets/images/mindfulness-1.jpg`);
      break;
    case 'mindfulness-2':
      image = require(`../../assets/images/mindfulness-2.jpg`);
      break;
    case 'pre-flight-preperation-1':
      image = require(`../../assets/images/pre-flight-preperation-1.jpg`);
      break;
    case 'relaxation-techniques-1':
      image = require(`../../assets/images/relaxation-techniques-1.jpg`);
      break;
    case 'relaxation-techniques-2':
      image = require(`../../assets/images/relaxation-techniques-2.jpg`);
      break;
    default:
      break;
  }

  return image;
};
