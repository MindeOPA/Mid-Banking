CREATE TABLE IF NOT EXISTS `mid_bank_accounts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(60) NOT NULL,
    `account_number` VARCHAR(20) NOT NULL,
    `pin` INT NOT NULL,
    `savings` BIGINT NOT NULL DEFAULT 0,
    `is_frozen` TINYINT NOT NULL DEFAULT 0,
    `frozen_until` INT DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `account_number` (`account_number`),
    UNIQUE KEY `identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mid_bank_transactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `account_number` VARCHAR(20) NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `amount` BIGINT NOT NULL,
    `balance_after` BIGINT NOT NULL,
    `description` VARCHAR(255) DEFAULT '',
    `reference` VARCHAR(60) DEFAULT '',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_account` (`account_number`),
    KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mid_bank_shared` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `account_number` VARCHAR(20) NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `owner_identifier` VARCHAR(60) NOT NULL,
    `balance` BIGINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `account_number` (`account_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mid_bank_shared_members` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `shared_account_id` INT NOT NULL,
    `identifier` VARCHAR(60) NOT NULL,
    `role` VARCHAR(20) NOT NULL DEFAULT 'member',
    `added_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_shared` (`shared_account_id`),
    UNIQUE KEY `unique_member` (`shared_account_id`, `identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mid_bank_loans` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `account_number` VARCHAR(20) NOT NULL,
    `amount` BIGINT NOT NULL,
    `remaining` BIGINT NOT NULL,
    `interest_rate` FLOAT NOT NULL DEFAULT 5.0,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_loan_account` (`account_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mid_bank_logs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(60) NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `details` TEXT,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_log_identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
