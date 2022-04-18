<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ImageAnimalRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AnimalImageController extends AbstractController
{
    public function __construct(
        private ImageAnimalRepository $imageAnimalRepository,
        private EntityManagerInterface $em
        )
    {
        
    }
    
    public function __invoke(Animal $animal, Request $request): ImageAnimal
    {  
        $image = new ImageAnimal();
        $featured = $request->request->get('featured') === "false" ? 0 : 1;
        $uploadFile = $request->files->get('file');
        if ($featured === 1) {
            $this->changeFeatured($animal, $image);
        }
        $image->setAnimal($animal);
        $image->setFeatured($featured);
        $image->setImageFile($uploadFile);
        return $image;
    }

    // find featured image in collection
    // change if user has decided
    public function changeFeatured(Animal $animal, ImageAnimal $image)
    {
        $imageActualyFeatured = $this->imageAnimalRepository
                                     ->findBy([
                                         "animal" => $animal->getId(),
                                         "featured" => true
                                        ]);
        if (!empty($imageActualyFeatured)) {
            $imageActualyFeatured[0]->setFeatured(0);
            $this->em->persist($imageActualyFeatured[0]);
        }
        // if image is in collection: it's not a new image
        if ($image->getFeatured() !== null) {
            $image->setFeatured(1);
            $this->em->persist($image);
        }
        $this->em->flush();
    }

    // to change image featured in collection 
    #[Route("featured/image/{id}", name: "app_change_featured")]
    public function changeFeaturedCollection(ImageAnimal $image): Response
    {
        $this->changeFeatured($image->getAnimal(), $image);
        return $this->json(true);
    }
}