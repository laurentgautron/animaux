<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AnimalRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ApiResource(
    attributes: ["pagination_items_per_page" => 9],
    normalizationContext: ['groups' => ['read:collection']]
)]
#[ApiFilter(SearchFilter::class, properties: ["animalName" => 'start', 'species' => "exact"])]
#[ORM\Entity(repositoryClass: AnimalRepository::class)]

class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    private $animalName;

    #[ORM\ManyToMany(targetEntity: Continent::class, inversedBy: 'animals')]
    #[Groups(['read:collection'])]
    private $continents;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: WorldPopulation::class)]
    private $worldPopulation;

    #[ORM\ManyToOne(targetEntity: Species::class, inversedBy: 'animals')]
    #[Groups(['read:collection'])]
    private $species;

    #[ORM\ManyToOne(targetEntity: Diet::class, inversedBy: 'animals')]
    #[Groups(['read:collection'])]
    private $diet;

    #[ORM\Column(type: 'text')]
    #[Groups(['read:collection'])]
    private $description;

    public function __construct()
    {
        $this->continents = new ArrayCollection();
        $this->worldPopulation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnimalName(): ?string
    {
        return $this->animalName;
    }

    public function setAnimalName(string $animalName): self
    {
        $this->animalName = $animalName;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
