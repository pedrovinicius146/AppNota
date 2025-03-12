from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Registro
from .serializers import RegistroSerializer

class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

    @action(detail=False, methods=['get'])
    def consultar(self, request):
        
        cidade = request.query_params.get('cidade', None)
        estado = request.query_params.get('estado', None)
        nome = request.query_params.get('nome', None)
        cpf = request.query_params.get('cpf', None)
        idade = request.query_params.get('idade', None)
        matricula = request.query_params.get('matricula', None)

        registros = Registro.objects.all()

        if cidade:
            registros = registros.filter(cidade=cidade)
        if estado:
            registros = registros.filter(estado=estado)
        if nome:
            registros = registros.filter(nome__icontains=nome)
        if cpf:
            registros = registros.filter(cpf=cpf)
        if idade:
            registros = registros.filter(idade=idade)
        if matricula:
            registros = registros.filter(matricula=matricula)

        serializer = RegistroSerializer(registros, many=True)
        return Response(serializer.data)