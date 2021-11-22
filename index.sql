CREATE TABLE users(
    id UUID DEFAULT uuid_generate_v4 (),
    user_name VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    profile_pic VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    PRIMARY KEY(id)
);

CREATE TABLE posts(
    id UUID DEFAULT uuid_generate_v4 (),
    post_title VARCHAR NOT NULL,
    post_desc VARCHAR NOT NULL,
    photo VARCHAR,
    categories VARCHAR(15) [],
    userID UUID DEFAULT uuid_generate_v4 (),
    createdAt DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY(id),
    FOREIGN KEY(userID) REFERENCES users(id)
);