// 트윗 아이디 만들기. getTime 하고 유저아이디 결합하기?
// 트윗 아이디 만들기. getTime 하고 유저아이디 결합하기?
const createRandomTweetId = () => {
  const time: number = new Date().getTime();
  // 출처: https://stackoverflow.com/a/21816629
  const randomNumber: number = Math.floor(Math.random() * 899999 + 100000);
  return parseInt(`${time}${randomNumber}`);
};

export default createRandomTweetId;
