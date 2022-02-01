<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220201140341 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal DROP FOREIGN KEY FK_6AAB231F9B4CB3A8');
        $this->addSql('DROP INDEX IDX_6AAB231F9B4CB3A8 ON animal');
        $this->addSql('ALTER TABLE animal CHANGE diets_id diet_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE animal ADD CONSTRAINT FK_6AAB231FE1E13ACE FOREIGN KEY (diet_id) REFERENCES diet (id)');
        $this->addSql('CREATE INDEX IDX_6AAB231FE1E13ACE ON animal (diet_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal DROP FOREIGN KEY FK_6AAB231FE1E13ACE');
        $this->addSql('DROP INDEX IDX_6AAB231FE1E13ACE ON animal');
        $this->addSql('ALTER TABLE animal CHANGE diet_id diets_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE animal ADD CONSTRAINT FK_6AAB231F9B4CB3A8 FOREIGN KEY (diets_id) REFERENCES diet (id)');
        $this->addSql('CREATE INDEX IDX_6AAB231F9B4CB3A8 ON animal (diets_id)');
    }
}
