
from django.db import models

class Registro(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    idade = models.IntegerField()
    matricula = models.CharField(max_length=50, unique=True)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)
    matematica = models.IntegerField(default=0)
    estruturaDeDados = models.IntegerField(default=0)
    algoritmos = models.IntegerField(default=0)
    
    def _str_(self):
        return self.nome
