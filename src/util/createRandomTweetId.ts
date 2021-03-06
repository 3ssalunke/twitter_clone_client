const createRandomTweetId = () => {
  const time: number = new Date().getTime();
  // 출처: https://stackoverflow.com/a/21816629
  const randomNumber: number = Math.floor(Math.random() * 899999 + 100000);
  return parseInt(`${time}${randomNumber}`);
};

export default createRandomTweetId;
