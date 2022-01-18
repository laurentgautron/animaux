<?php

namespace App\Entity;

use App\Repository\AnimalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnimalRepository::class)]
class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 100)]
    private $name;

    #[ORM\ManyToMany(targetEntity: Continent::class, inversedBy: 'animals')]
    private $continents;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: WorldPopulation::class)]
    private $worldPopulation;

    #[ORM\ManyToOne(targetEntity: Species::class, inversedBy: 'animals')]
    private $species;

    #[ORM\ManyToOne(targetEntity: Diet::class, inversedBy: 'animals')]
    private $diet;

    public function __construct()
    {
        $this->continents = new ArrayCollection();
        $this->worldPopulation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Continent[]
     */
    public function getContinents(): Collection
    {
        return $this->continents;
    }

    public function addContinent(Continent $continent): self
    {
        if (!$this->continents->contains($continent)) {
            $this->continents[] = $continent;
        }

        return $this;
    }

    public function removeContinent(Continent $continent): self
    {
        $this->continents->removeElement($continent);

        return $this;
    }

    /**
     * @return Collection|WorldPopulation[]
     */
    public function getWorldPopulation(): Collection
    {
        return $this->worldPopulation;
    }

    public function addWorldPopulation(WorldPopulation $worldPopulation): self
    {
        if (!$this->worldPopulation->contains($worldPopulation)) {
            $this->worldPopulation[] = $worldPopulation;
            $worldPopulation->setAnimal($this);
        }

        return $this;
    }

    public function removeWorldPopulation(WorldPopulation $worldPopulation): self
    {
        if ($this->worldPopulation->removeElement($worldPopulation)) {
            // set the owning side to null (unless already changed)
            if ($worldPopulation->getAnimal() === $this) {
                $worldPopulation->setAnimal(null);
            }
        }

        return $this;
    }

    public function getSpecies(): ?Species
    {
        return $this->species;
    }

    public function setSpecies(?Species $species): self
    {
        $this->species = $species;

        return $this;
    }

    public function getDiet(): ?Diet
    {
        return $this->diet;
    }

    public function setDiet(?Diet $diet): self
    {
        $this->diet = $diet;

        return $this;
    }
}
