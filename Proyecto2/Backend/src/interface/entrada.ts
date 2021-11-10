interface Text {
    _text: string;
  }
  interface Formato {
    nombre: Text;
  }
  interface RequisitoInfo {
    nombre: Text;
    formatos: Formato[] | Formato;
    tamano: Text;
    obligatorio: Text;
  }
  interface Requisito {
    requisito: RequisitoInfo;
  }
  interface CategoriaInfo {
    nombre: Text;
  }
  interface Categoria {
    categoria: CategoriaInfo;
  }
  interface PuestoInfo {
    nombre: Text;
    salario: Text;
    categorias: Categoria[] | Categoria;
    requisitos: Requisito[] | Requisito;
  }
  interface Puesto {
    puesto: PuestoInfo;
  }
  interface DepartamentoInfo {
    nombre: Text;
    capital_total: Text;
    puestos: Puesto[] | Puesto;
    departamentos: Departamento[] | Departamento | null;
  }
  interface Departamento {
    departamento: DepartamentoInfo;
  }
  
  
  export interface Entrada {
    departamentos: Departamento[] | Departamento;
  }