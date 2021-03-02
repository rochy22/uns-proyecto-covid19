<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200817201004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        //$this->addSql('CREATE SCHEMA public');
        //  $this->addSql('DROP SEQUENCE hashtag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE hashtag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE hashtag (id INT NOT NULL, name VARCHAR(20),  cantidad INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql("INSERT INTO hashtag (id, name, cantidad) VALUES (1, 'QuedateEnCasa', 0)");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        //  $this->addSql('ALTER TABLE hashtag DROP cantidad');
        // $this->addSql('ALTER TABLE hashtag ALTER name TYPE VARCHAR(20)');
    }
}
