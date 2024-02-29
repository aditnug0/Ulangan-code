-- CreateTable
CREATE TABLE `admin` (
    `adminId` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_admin` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `carId` INTEGER NOT NULL AUTO_INCREMENT,
    `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    `merekMobil` VARCHAR(191) NOT NULL DEFAULT '',
    `priceDay` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`carId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rent` (
    `rentId` INTEGER NOT NULL AUTO_INCREMENT,
    `carId` INTEGER NOT NULL DEFAULT 0,
    `namaPenyewa` VARCHAR(191) NOT NULL DEFAULT '',
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lamaSewa` INTEGER NOT NULL DEFAULT 0,
    `totalBayar` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`rentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rent` ADD CONSTRAINT `rent_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `car`(`carId`) ON DELETE RESTRICT ON UPDATE CASCADE;
