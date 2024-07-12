-- CREATE TABLE todo
-- (
-- --     id       INT(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255) NOT NULL
--     );

-- login: test, heslo: test (hashed)
INSERT INTO roles (id, name)
VALUES (1, 'ROLE_USER'),
       (2, 'ROLE_ADMIN');

-- INSERT INTO users (id, username, email, password)
-- VALUES (1, 'adminattff', 'adminat@necoff.com', '$2a$10$VsGhlXDzye9G8QeR5AKQF.WaZaG3ie//0Qm8.kbgHtzDn4lDvFN8m');
--
-- INSERT INTO user_roles (user_id, role_id)
-- VALUES (1, 2);