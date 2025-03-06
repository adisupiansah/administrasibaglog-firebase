-- CreateTable
CREATE TABLE `ambilnomor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `satfung` VARCHAR(100) NOT NULL,
    `perihal` VARCHAR(200) NOT NULL,
    `no_pengajuan` VARCHAR(100) NOT NULL,
    `tgl_pengajuan` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arsipnotadinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_surat` VARCHAR(100) NOT NULL,
    `no_surat` VARCHAR(100) NOT NULL,
    `kepada` VARCHAR(100) NOT NULL,
    `perihal` VARCHAR(200) NOT NULL,
    `tgl_input` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disposisi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_surat` VARCHAR(100) NOT NULL,
    `no_disposisi` VARCHAR(100) NOT NULL,
    `no_surat` VARCHAR(100) NOT NULL,
    `perihal` VARCHAR(200) NOT NULL,
    `satfung` VARCHAR(100) NOT NULL,
    `tgl_disposisi` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type_disposisi` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notadinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_surat` VARCHAR(100) NOT NULL,
    `no_surat` VARCHAR(100) NOT NULL,
    `kepada` VARCHAR(100) NOT NULL,
    `perihal` VARCHAR(200) NOT NULL,
    `tgl_input` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type_notadinas` VARCHAR(100) NOT NULL,
    `notadinas_pdf` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
