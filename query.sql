CREATE TABLE users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active TINYINT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

INSERT INTO users
VALUES
(1, 'bunny@me.com', 'bunny', 1, '2025-10-01 10:50:30', '2025-10-01 10:50:30'),
(2, 'lola@me.com', 'lola', 1, '2025-10-01 10:50:30', '2025-10-01 10:50:30');