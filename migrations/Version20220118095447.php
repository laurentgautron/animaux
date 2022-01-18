<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220118095447 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE animal (id INT AUTO_INCREMENT NOT NULL, species_id INT DEFAULT NULL, diet_id INT DEFAULT NULL, name VARCHAR(100) NOT NULL, INDEX IDX_6AAB231FB2A1D860 (species_id), INDEX IDX_6AAB231FE1E13ACE (diet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE animal_continent (animal_id INT NOT NULL, continent_id INT NOT NULL, INDEX IDX_946321138E962C16 (animal_id), INDEX IDX_94632113921F4C77 (continent_id), PRIMARY KEY(animal_id, continent_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE continent (id INT AUTO_INCREMENT NOT NULL, continent_name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE diet (id INT AUTO_INCREMENT NOT NULL, diet_name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE species (id INT AUTO_INCREMENT NOT NULL, species_name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE world_population (id INT AUTO_INCREMENT NOT NULL, animal_id INT DEFAULT NULL, population INT NOT NULL, year VARCHAR(4) NOT NULL, INDEX IDX_D00B24E18E962C16 (animal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE animal ADD CONSTRAINT FK_6AAB231FB2A1D860 FOREIGN KEY (species_id) REFERENCES species (id)');
        $this->addSql('ALTER TABLE animal ADD CONSTRAINT FK_6AAB231FE1E13ACE FOREIGN KEY (diet_id) REFERENCES diet (id)');
        $this->addSql('ALTER TABLE animal_continent ADD CONSTRAINT FK_946321138E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE animal_continent ADD CONSTRAINT FK_94632113921F4C77 FOREIGN KEY (continent_id) REFERENCES continent (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE world_population ADD CONSTRAINT FK_D00B24E18E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal_continent DROP FOREIGN KEY FK_946321138E962C16');
        $this->addSql('ALTER TABLE world_population DROP FOREIGN KEY FK_D00B24E18E962C16');
        $this->addSql('ALTER TABLE animal_continent DROP FOREIGN KEY FK_94632113921F4C77');
        $this->addSql('ALTER TABLE animal DROP FOREIGN KEY FK_6AAB231FE1E13ACE');
        $this->addSql('ALTER TABLE animal DROP FOREIGN KEY FK_6AAB231FB2A1D860');
        $this->addSql('DROP TABLE animal');
        $this->addSql('DROP TABLE animal_continent');
        $this->addSql('DROP TABLE continent');
        $this->addSql('DROP TABLE diet');
        $this->addSql('DROP TABLE species');
        $this->addSql('DROP TABLE world_population');
    }
}
