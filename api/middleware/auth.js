import jwt from 'jsonwebtoken'

// auth 미들웨어는 사용자가 포스팅을 쓰거나, 어떤 권한이 필요한 일을 할 때 token이 유효한지 확인하기 위한 수단
// 예 ) 클릭 기능을 수행할 경우, auth 미들웨어를 거쳐 next 함수를 수행할 때만 그 기능이 실행된다. 
const auth = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if(token) {
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id;
    }
    next();
  }catch(err){
    console.log(err)
  }
}

export default auth;

// auth 미들웨어는 routes 폴더 내부에서 사용 된다. 