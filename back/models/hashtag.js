module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      // 모델명은 대문자+ 단수형 / 테이블명은 소문자+복수형,
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Hashtag.associate = db => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // belongsToMany는 중간에 테이블이 하나 더 생긴다.
  };
  return Hashtag;
};
