<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TweetsRepository")
 */
class Tweets
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $sad;

    /**
     * @ORM\Column(type="integer")
     */
    private $neutral;

    /**
     * @ORM\Column(type="integer")
     */
    private $good;

    /**
     * @ORM\Column(type="date")
     */
    private $day;

    /**
     * Tweets constructor
     * @param $sad
     * @param $neutral
     * @param $good
     * @param null $day
     */
    public function __construct($sad = 0, $neutral = 0, $good = 0, $day = null)
    {
        $this->sad = $sad;
        $this->neutral = $neutral;
        $this->good = $good;
        $this->day = $day;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSad(): ?int
    {
        return $this->sad;
    }

    public function setSad(int $sad): self
    {
        $this->sad = $sad;

        return $this;
    }

    public function getNeutral(): ?int
    {
        return $this->neutral;
    }

    public function setNeutral(int $neutral): self
    {
        $this->neutral = $neutral;

        return $this;
    }

    public function getGood(): ?int
    {
        return $this->good;
    }

    public function setGood(int $good): self
    {
        $this->good = $good;

        return $this;
    }

    public function getDay(): ?\DateTimeInterface
    {
        return $this->day;
    }

    public function setDay(\DateTimeInterface $day): self
    {
        $this->day = $day;

        return $this;
    }
}
