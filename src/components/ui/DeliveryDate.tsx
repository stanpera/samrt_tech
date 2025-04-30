const currentDate = new Date();
const currentTime = currentDate.getTime();

const endTime = new Date(
  currentTime + Math.ceil(Math.random() * 24 * 60 * 60 * 1000 * 7)
);

const deliveryFrom = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);

const deliveryTo = new Date(
  endTime.getFullYear(),
  endTime.getMonth(),
  endTime.getDate()
);

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-GB", options);
};

const DeliveryDate = () => {
  return (
    <p>
      Estimated arrival {formatDate(deliveryFrom)} - {formatDate(deliveryTo)}
    </p>
  );
};

export default DeliveryDate;
