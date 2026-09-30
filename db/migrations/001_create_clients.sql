-- O database já é criado pelo provedor (Clever Cloud), e o usuário da aplicação
-- não tem permissão para criar outro: aqui cuidamos apenas das tabelas.
CREATE TABLE IF NOT EXISTS clients (
  idclient INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(120) NOT NULL,
  age      INT NULL,
  UF       CHAR(2) NOT NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;