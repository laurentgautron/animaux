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
    attributes: [
        "pagination_items_per_page" => 9,
        'input_formats' => ['jsonld' => 'application/ld+json'],
        'output_formats' => ['jsonld' => 'application/ld+json']
    ],
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext: ['groups' => ['write:collection']],
)]
#[ApiFilter(SearchFilter::class, properties: [
    "animalName" => 'partial', 
    'species' => "exact",
    'continents' => 'exact', 
    'diet' => 'exact'
    ]
)]
#[ORM\Entity(repositoryClass: AnimalRepository::class)]

class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank(message: "vous devez donner un nom commun à l'animal")]
    #[Groups(['read:collection', 'write:collection'])]
    private $animalName;

    #[ORM\ManyToMany(targetEntity: Continent::class, inversedBy: 'animals')]
    #[Assert\Count(min: 1, minMessage: "vous devez renseigner au moins un continent !")]
    #[Groups(['read:collection', 'write:collection'])]
    private $continents;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: WorldPopulation::class)]
    private $worldPopulation;

    #[ORM\ManyToOne(targetEntity: Species::class, inversedBy: 'animals')]
    #[Assert\NotBlank(message: "vous devez choisir une espèce parmi la liste")]
    #[Groups(['read:collection', 'write:collection'])]
    private $species;

    #[ORM\ManyToOne(targetEntity: Diet::class, inversedBy: 'animals')]
    #[Assert\NotBlank(message: "vous devez choisir le régime alimentaire dans la liste")]
    #[Groups(['read:collection', 'write:collection'])]
    private $diet;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "vous devez écrire une description pour l'animal")]
    #[Groups(['read:collection', 'write:collection'])]
    private $description;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: ImageAnimal::class)]
    #[Groups(['read:collection', 'write:collection'])]
    private $image;

    public function __construct()
    {
        $this->continents = new ArrayCollection();
        $this->worldPopulation = new ArrayCollection();
        $this->image = new ArrayCollection();
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

    /**
     * @return Collection|ImageAnimal[]
     */
    public function getImage(): Collection
    {
        return $this->image;
    }

    public function addImage(ImageAnimal $image): self
    {
        if (!$this->image->contains($image)) {
            $this->image[] = $image;
            $image->setAnimal($this);
        }

        return $this;
    }

    public function removeImage(ImageAnimal $image): self
    {
        if ($this->image->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getAnimal() === $this) {
                $image->setAnimal(null);
            }
        }

        return $this;
    }
}
