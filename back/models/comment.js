module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      // 모델명은 대문자+ 단수형 / 테이블명은 소문자+복수형,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  //models/indext의 Object.key의 db가 넘어온다고 보면 됨.
  Comment.associate = db => {
    db.Comment.belongsTo(db.User); //댓글은 사람한테 속해있고
    db.Comment.belongsTo(db.Post); //댓글은 게시물에도 속해있을 수 있다.
  };
  return Comment;
};
