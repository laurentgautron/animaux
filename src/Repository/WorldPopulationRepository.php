<?php

namespace App\Repository;

use App\Entity\WorldPopulation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WorldPopulation|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorldPopulation|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorldPopulation[]    findAll()
 * @method WorldPopulation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorldPopulationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorldPopulation::class);
    }

    // /**
    //  * @return WorldPopulation[] Returns an array of WorldPopulation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WorldPopulation
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
