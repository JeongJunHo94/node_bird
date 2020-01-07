module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // 모델명은 대문자+ 단수형 / 테이블명은 소문자+복수형,
      src: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Image.associate = db => {
    db.Image.belongsTo(db.Post); //이미지는 게시물에 속한다.
  };
  return Image;
};
