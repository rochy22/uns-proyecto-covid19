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
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE hashtags_tweets_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE hashtag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('DROP TABLE hashtags_tweets');
        $this->addSql('ALTER TABLE hashtag ADD cantidad INT NOT NULL');
        $this->addSql('ALTER TABLE hashtag ALTER name TYPE VARCHAR(255)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE hashtag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE hashtags_tweets_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE hashtags_tweets (id INT NOT NULL, id_tweet INT NOT NULL, id_hashtag INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE hashtag DROP cantidad');
        $this->addSql('ALTER TABLE hashtag ALTER name TYPE VARCHAR(20)');
    }
}
