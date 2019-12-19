//sequelize, DataTypes를 매개변수로 가지는 함수를 생성했다고 이해할것
module.exports = (sequelize, DataTypes) => {
  //User라는 테이블 만들것임
  //DB에서는 테이블이라고 부르지만 sequelize에서는 모델이라고 부름
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(40), //40자 이내
        allowNull: false, //필수라는 의미
        unique: true //중복금지
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
      //createdAt, updatedAt(생성일, 수정일, id를 sequelize가 자동으로 추가해준다.)
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //한글 저장을 위해서
    }
  );
  User.associate = db => {};
  return User;
};
