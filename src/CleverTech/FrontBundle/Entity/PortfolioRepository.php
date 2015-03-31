<?php

namespace CleverTech\FrontBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PortfolioRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PortfolioRepository extends EntityRepository
{
    public function findAllByDate() {
        return $this->findBy(array(), array('done' => 'DESC'));
    }
}
