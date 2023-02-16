create table post
(
    id int generated always as identity primary key,
    author text not null,
    subscribers bigint not null,
    title text not null,
    content text not null,
    img text not null,
    published text not null
);
