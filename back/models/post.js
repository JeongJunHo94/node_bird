module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // 모델명은 대문자+ 단수형 / 테이블명은 소문자+복수형,
      content: {
        type: DataTypes.TEXT, //TEXT : 길이를 산정할 수 없는 매우 긴 글을 의미
        allowNull: false
      }
    },
    {
      //이모티콘을 허용하려면 mb4를 추가
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  //테이블들, 모델들간의 관계
  //1대1  hasOne, belongsTo
  //1대다 hasMany, belongsTo
  //다대다  belongsToMany
  Post.associate = db => {
    db.Post.belongsTo(db.User); //UserId를 가지게 된다-> 아이디를 토대로 게시자를 알 수 있다.
    db.Post.hasMany(db.Comment); //hasMany를 통해 db에서 a라는 사람이 쓴 게시물 전부가져오기 같은 기능, 게시글을 통해 사람을 불러오는 기능을 쓸 수 있다.
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // belongsToMany는 중간에 테이블이 하나 더 생긴다.
  };
  return Post;
};
