-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupeusers` (
    `IdG` INTEGER NOT NULL,
    `IdU` VARCHAR(255) NOT NULL,

    INDEX `fk_GroupeUsers_User_1`(`IdU`),
    PRIMARY KEY (`IdG`, `IdU`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reminder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `dateRendu` DATETIME(0) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `couleur` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    INDEX `fk_Reminder_Group_1`(`groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groupeusers` ADD CONSTRAINT `fk_GroupeUsers_Group_1` FOREIGN KEY (`IdG`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupeusers` ADD CONSTRAINT `fk_GroupeUsers_User_1` FOREIGN KEY (`IdU`) REFERENCES `user`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reminder` ADD CONSTRAINT `fk_Reminder_Group_1` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
