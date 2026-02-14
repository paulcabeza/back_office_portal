# Plan Maestro — Back Office MLM Binario Hibrido Progresivo

> **Version:** 1.0
> **Fecha:** 2026-02-13
> **Estado:** En revision por Gerencia de Operaciones

---

## Tabla de Contenido

1. [Vision General del Sistema](#1-vision-general-del-sistema)
2. [Glosario de Terminos](#2-glosario-de-terminos)
3. [Estructura de la Red — Sistema Binario Hibrido Progresivo](#3-estructura-de-la-red--sistema-binario-hibrido-progresivo)
4. [Plan de Compensacion](#4-plan-de-compensacion)
5. [Sistema de Rangos y Calificaciones](#5-sistema-de-rangos-y-calificaciones)
6. [Modulo de Usuarios y Afiliados](#6-modulo-de-usuarios-y-afiliados)
7. [Modulo de Genealogia (Arbol de Red)](#7-modulo-de-genealogia-arbol-de-red)
8. [Modulo de Productos y Catalogo](#8-modulo-de-productos-y-catalogo)
9. [Modulo de Pedidos y Ventas](#9-modulo-de-pedidos-y-ventas)
10. [Modulo de Comisiones y Liquidacion](#10-modulo-de-comisiones-y-liquidacion)
11. [Modulo de Inventario](#11-modulo-de-inventario)
12. [Modulo de Reportes y Dashboard](#12-modulo-de-reportes-y-dashboard)
13. [Modulo de Administracion del Sistema](#13-modulo-de-administracion-del-sistema)
14. [Modulo de Comunicaciones y Notificaciones](#14-modulo-de-comunicaciones-y-notificaciones)
15. [Modulo de Facturacion e Integraciones Fiscales](#15-modulo-de-facturacion-e-integraciones-fiscales)
16. [Modulo de Pagos y Billetera Virtual](#16-modulo-de-pagos-y-billetera-virtual)
17. [Modulo de Eventos y Capacitaciones](#17-modulo-de-eventos-y-capacitaciones)
18. [Reglas de Negocio Criticas](#18-reglas-de-negocio-criticas)
19. [Normativas y Compliance](#19-normativas-y-compliance)

---

## 1. Vision General del Sistema

### 1.1 Proposito

Sistema de back office integral para la gestion de una empresa de venta directa bajo el modelo de marketing multinivel (MLM) con plan de compensacion **binario hibrido progresivo**, similar al modelo operativo de Gano Excel Internacional.

### 1.2 Objetivos Principales

- Gestionar la red completa de distribuidores/afiliados y su genealogia binaria.
- Calcular y liquidar comisiones, bonos e incentivos de manera automatica, precisa y auditable.
- Administrar el catalogo de productos, pedidos, inventario y logistica.
- Proveer un dashboard administrativo con metricas clave del negocio en tiempo real.
- Generar reportes operativos, financieros y de cumplimiento normativo.
- Integrarse con sistemas de facturacion electronica y pasarelas de pago.

### 1.3 Usuarios del Sistema

| Rol | Descripcion |
|-----|-------------|
| **Super Administrador** | Control total del sistema. Configuracion global. |
| **Administrador** | Gestion operativa: usuarios, comisiones, productos, reportes. |
| **Gerente de Operaciones** | Supervision de la red, aprobacion de liquidaciones, reportes ejecutivos. |
| **Soporte / Atencion al Cliente** | Gestion de tickets, consultas de afiliados, ajustes manuales limitados. |
| **Afiliado / Distribuidor** | Acceso a su oficina virtual: genealogia, comisiones, pedidos, perfil. |
| **Bodega / Almacen** | Gestion de inventario, despacho de pedidos. |
| **Contabilidad / Finanzas** | Reportes financieros, conciliaciones, facturacion. |

---

## 2. Glosario de Terminos

| Termino | Definicion |
|---------|------------|
| **Afiliado / Distribuidor / IBO** | Persona inscrita en la red que puede comprar productos a precio de distribuidor y patrocinar nuevos miembros. |
| **Patrocinador (Sponsor)** | Afiliado que inscribe directamente a otro afiliado en la red. |
| **Upline** | Linea ascendente de patrocinadores hasta la raiz del arbol. |
| **Downline** | Linea descendente de afiliados patrocinados directa o indirectamente. |
| **Pierna Izquierda / Derecha** | Las dos ramas del arbol binario de cada afiliado. |
| **Pierna Fuerte (Power Leg)** | La pierna con mayor volumen acumulado. |
| **Pierna Debil (Profit Leg)** | La pierna con menor volumen; es la que genera comisiones por binario. |
| **BV (Business Volume)** | Valor de negocio asignado a cada producto; base para el calculo de comisiones. |
| **PV (Personal Volume)** | Volumen personal de compras de un afiliado en un periodo. |
| **GV (Group Volume)** | Volumen grupal acumulado en una pierna. |
| **Punto de Calificacion (QV)** | Volumen requerido para mantener la calificacion activa. |
| **Ciclo / Corte** | Periodo de tiempo (semanal, quincenal o mensual) para calculo de comisiones. |
| **Flush / Tope** | Limite maximo de volumen acumulable que se arrastra de un periodo a otro. |
| **Compresion** | Mecanismo que salta afiliados inactivos en el calculo de comisiones unilevel. |
| **Auto-envio / Autoship** | Compra recurrente automatica para mantener la calificacion. |
| **Kit de Inscripcion** | Paquete de productos requerido para activar la membresia de un nuevo afiliado. |
| **Rango / Nivel** | Categoria alcanzada por un afiliado segun su desempeno y volumen de red. |
| **Derrame (Spillover)** | Colocacion automatica de nuevos afiliados en posiciones disponibles del arbol binario. |

---

## 3. Estructura de la Red — Sistema Binario Hibrido Progresivo

### 3.1 Modelo Binario Puro

Cada afiliado tiene **exactamente dos posiciones** debajo de si (pierna izquierda y pierna derecha). Cuando un afiliado patrocina mas de dos personas, las adicionales se colocan en niveles inferiores del arbol (**derrame/spillover**).

```
          [Afiliado A]
         /            \
   [Afiliado B]    [Afiliado C]
   /       \         /       \
 [D]      [E]     [F]      [G]
```

### 3.2 Componente Hibrido

El sistema es **hibrido** porque combina:

1. **Bono Binario:** Basado en el volumen de la pierna debil (modelo binario clasico).
2. **Bono Unilevel:** Comisiones por niveles de profundidad sobre las compras de la red directa (modelo unilevel).
3. **Bonos Directos:** Comisiones por patrocinio directo, independientes de la estructura binaria.
4. **Bonos de Liderazgo / Generacionales:** Porcentaje de las ganancias binarias de lideres en su red descendente.

### 3.3 Componente Progresivo

El sistema es **progresivo** porque:

- Los porcentajes de comision **aumentan** conforme el afiliado sube de rango.
- El **tope diario/semanal** de ganancias binarias se incrementa con el rango.
- Se desbloquean bonos adicionales al alcanzar rangos superiores.
- El numero de niveles de profundidad para el bono unilevel crece con el rango.

### 3.4 Reglas de Colocacion en el Arbol

| Regla | Descripcion |
|-------|-------------|
| **Colocacion manual** | El patrocinador elige en que pierna colocar al nuevo afiliado. |
| **Colocacion automatica (spillover)** | Si ambas posiciones directas estan ocupadas, el sistema coloca al nuevo afiliado en la posicion disponible mas cercana segun la estrategia configurada. |
| **Estrategias de derrame** | Configurable: pierna debil primero, pierna fuerte primero, extremo izquierdo, extremo derecho, o balanceado. |
| **Bloqueo de movimiento** | Una vez colocado, un afiliado NO puede ser movido a otra posicion del arbol (salvo por administrador con justificacion y registro de auditoria). |
| **Patrocinador vs Posicion** | El patrocinador (sponsor) y la posicion en el arbol (placement) pueden ser diferentes. Se mantienen ambas relaciones. |

### 3.5 Reglas de Profundidad

- El arbol binario no tiene limite teorico de profundidad.
- El calculo de BV para el bono binario acumula volumen de **toda la profundidad** de cada pierna.
- El bono unilevel tiene profundidad limitada segun el rango del afiliado (ej: Bronce = 3 niveles, Plata = 5, Oro = 7, etc.).

---

## 4. Plan de Compensacion

### 4.1 Resumen de Bonos

| # | Tipo de Bono | Descripcion | Frecuencia |
|---|-------------|-------------|------------|
| 1 | **Bono de Patrocinio Directo** | Porcentaje sobre la primera compra / kit de inscripcion de cada patrocinado directo. | Inmediato |
| 2 | **Bono Binario (Pareamiento)** | Porcentaje sobre el BV de la pierna debil en cada ciclo. | Semanal / Quincenal |
| 3 | **Bono Unilevel (Residual)** | Porcentaje sobre las compras recurrentes de la red por niveles de profundidad. | Mensual |
| 4 | **Bono de Liderazgo (Matching)** | Porcentaje del bono binario generado por lideres en su red. | Semanal / Quincenal |
| 5 | **Bono de Inicio Rapido** | Incentivo adicional por alcanzar metas dentro de los primeros 30/60/90 dias. | Unico |
| 6 | **Bono de Rango** | Bono unico al alcanzar un nuevo rango por primera vez. | Unico |
| 7 | **Bono de Retencion / Re-compra** | Porcentaje adicional sobre auto-envios y compras recurrentes de directos. | Mensual |
| 8 | **Pool de Liderazgo Global** | Participacion en un fondo global repartido entre los rangos mas altos. | Mensual |
| 9 | **Incentivos y Viajes** | Premios no monetarios (viajes, autos, reconocimientos) al cumplir metas especiales. | Variable |

### 4.2 Bono de Patrocinio Directo

- **Trigger:** Un nuevo afiliado se inscribe y realiza su primera compra o adquiere un kit de inscripcion.
- **Beneficiario:** El patrocinador directo (sponsor).
- **Porcentaje base:** Configurable (tipicamente 20%-25% del BV del kit).
- **Requisito:** El patrocinador debe estar activo (haber cumplido su QV del periodo).
- **Pago:** Inmediato o en el proximo ciclo de liquidacion.

### 4.3 Bono Binario (Pareamiento)

Este es el bono principal del sistema.

**Mecanica:**
1. En cada ciclo, se acumula el BV total de la pierna izquierda y de la pierna derecha.
2. Se identifica la **pierna debil** (menor volumen) y la **pierna fuerte** (mayor volumen).
3. La comision se calcula como un porcentaje del BV de la **pierna debil**.
4. El BV utilizado se descuenta de ambas piernas (pareamiento).
5. El excedente de la pierna fuerte puede **arrastrarse** al siguiente periodo (carry-over) hasta un tope maximo (**flush**).

**Formula:**
```
Bono Binario = BV_pierna_debil x Porcentaje_segun_rango
```

**Parametros configurables:**

| Parametro | Descripcion | Ejemplo |
|-----------|-------------|---------|
| Porcentaje base | % sobre la pierna debil | 10% |
| Porcentaje progresivo | % que aumenta por rango | 10%-15% |
| Tope diario | Monto maximo de bono binario por dia | $500 - $50,000 segun rango |
| Tope semanal | Monto maximo por semana | $2,500 - $250,000 segun rango |
| Carry-over maximo | BV maximo que se arrastra de la pierna fuerte | 3x el tope semanal |
| Flush | Si el carry-over excede el maximo, se pierde el excedente | Si/No configurable |
| Ratio de balance | Relacion maxima entre piernas para calificar (ej: 1:3) | Configurable |

**Reglas adicionales:**
- El afiliado debe tener **al menos un activo en cada pierna** para calificar al bono binario.
- Se requiere un **PV minimo personal** en el periodo para calificar.
- Los puntos de volumen personal del propio afiliado NO cuentan para el binario (solo los de su red descendente).

### 4.4 Bono Unilevel (Residual)

**Mecanica:**
- Se calcula sobre las **compras recurrentes** (no kits de inscripcion) de los afiliados en la red descendente del patrocinador.
- Se paga por niveles de profundidad en el **arbol de patrocinio** (no en el arbol binario).
- El numero de niveles y el porcentaje por nivel dependen del rango.

**Tabla de porcentajes por nivel (ejemplo):**

| Nivel | Bronce | Plata | Oro | Platino | Diamante |
|-------|--------|-------|-----|---------|----------|
| 1 | 5% | 5% | 5% | 5% | 5% |
| 2 | 3% | 3% | 3% | 3% | 3% |
| 3 | 2% | 2% | 2% | 2% | 2% |
| 4 | — | 1% | 1% | 1% | 1% |
| 5 | — | 1% | 1% | 1% | 1% |
| 6 | — | — | 1% | 1% | 1% |
| 7 | — | — | 1% | 1% | 1% |
| 8 | — | — | — | 0.5% | 0.5% |
| 9 | — | — | — | — | 0.5% |
| 10 | — | — | — | — | 0.5% |

**Compresion:**
- Si un afiliado en un nivel intermedio esta **inactivo** (no cumplio su QV), el sistema lo salta y sus puntos de volumen se atribuyen al siguiente calificado hacia arriba.
- La compresion es configurable: activada/desactivada y con limite de niveles a comprimir.

### 4.5 Bono de Liderazgo (Matching Bonus)

- Se paga un porcentaje del **bono binario** generado por afiliados calificados en la red del lider.
- Solo disponible a partir de rangos intermedios (ej: Oro en adelante).
- Profundidad generacional (no niveles directos): se cuentan "generaciones" de lideres calificados.

**Ejemplo:**

| Generacion | Porcentaje |
|------------|------------|
| 1ra generacion | 10% |
| 2da generacion | 5% |
| 3ra generacion | 3% |
| 4ta generacion | 2% |
| 5ta generacion | 1% |

**Definicion de generacion:** Una nueva generacion comienza cada vez que se encuentra un lider del mismo rango o superior en la linea descendente.

### 4.6 Bono de Inicio Rapido

| Meta | Plazo | Bono |
|------|-------|------|
| Inscribir 2 directos activos (1 por pierna) | 30 dias | $50 o producto gratis |
| Alcanzar rango Bronce | 60 dias | $100 |
| Generar X BV en la pierna debil | 90 dias | $200 |

### 4.7 Bono de Rango

| Rango alcanzado | Bono unico |
|-----------------|------------|
| Plata | $500 |
| Oro | $1,000 |
| Platino | $3,000 |
| Diamante | $5,000 |
| Doble Diamante | $10,000 |
| Corona | $25,000 |
| Corona Real | $50,000 |
| Embajador | $100,000 |

*Los montos son configurables por la administracion.*

### 4.8 Pool de Liderazgo Global

- Se destina un porcentaje de las ventas globales de la empresa (tipicamente 2%-3%) a un fondo.
- Este fondo se reparte equitativamente entre todos los afiliados que mantienen rangos de Diamante o superior.
- Liquidacion mensual.

---

## 5. Sistema de Rangos y Calificaciones

### 5.1 Tabla de Rangos

| # | Rango | PV Personal | Directos Activos | BV Pierna Debil (acum.) | BV Pierna Fuerte (acum.) | Requisito Adicional |
|---|-------|-------------|------------------|------------------------|-------------------------|---------------------|
| 1 | Afiliado Activo | 100 | — | — | — | Compra minima mensual |
| 2 | Bronce | 100 | 2 (1+1) | 500 | 500 | — |
| 3 | Plata | 100 | 3 (2+1 o 1+2) | 2,000 | 2,000 | — |
| 4 | Oro | 150 | 4 (2+2) | 5,000 | 5,000 | 1 Bronce en cada pierna |
| 5 | Platino | 150 | 5 (3+2) | 15,000 | 15,000 | 1 Plata en cada pierna |
| 6 | Diamante | 200 | 6 (3+3) | 40,000 | 40,000 | 1 Oro en cada pierna |
| 7 | Doble Diamante | 200 | 8 (4+4) | 100,000 | 100,000 | 1 Platino en cada pierna |
| 8 | Corona | 200 | 10 (5+5) | 250,000 | 250,000 | 1 Diamante en cada pierna |
| 9 | Corona Real | 200 | 12 (6+6) | 500,000 | 500,000 | 2 Diamantes en cada pierna |
| 10 | Embajador | 200 | 15 (8+7) | 1,000,000 | 1,000,000 | 1 Corona en cada pierna |

*Todos los valores son configurables por la administracion.*

### 5.2 Reglas de Calificacion

- **Periodo de calificacion:** Mensual (configurable).
- **PV personal:** Debe cumplirse en cada periodo para mantener el status de "activo" y calificar a comisiones.
- **Directos activos:** Patrocinados directos que tambien cumplieron su PV personal en el periodo.
- **BV acumulado:** Volumen total generado en cada pierna desde la inscripcion o desde el ultimo reset (configurable).
- **Rangos vitalicios vs periodicos:** Configurable. Opcion de que un rango una vez alcanzado sea vitalicio (para reconocimiento) pero el **rango pagado** (que determina topes y porcentajes) se recalcula cada periodo.

### 5.3 Mantenimiento y Degradacion de Rango

- Si un afiliado no cumple los requisitos de su rango actual en un periodo, su **rango pagado** baja al rango para el cual si califica.
- El **rango maximo historico** se mantiene como referencia (reconocimiento).
- Periodo de gracia configurable: 1-3 meses para recuperar el rango antes de la degradacion efectiva.

---

## 6. Modulo de Usuarios y Afiliados

### 6.1 Registro e Inscripcion

- Formulario de inscripcion con datos personales, fiscales y de contacto.
- Asignacion de **ID unico** de afiliado (codigo alfanumerico o numerico secuencial).
- Seleccion de **kit de inscripcion** (obligatorio para activar la membresia).
- Vinculacion con **patrocinador** (por codigo o link de referido).
- Seleccion de **pierna** de colocacion (izquierda o derecha) o colocacion automatica.
- Aceptacion de terminos y condiciones, politica de privacidad y contrato de distribuidor independiente.
- Verificacion de identidad (documento, selfie — configurable).

### 6.2 Perfil del Afiliado

**Datos personales:**
- Nombre completo, fecha de nacimiento, genero.
- Documento de identidad (tipo y numero).
- Direccion de residencia.
- Telefono, email, redes sociales.
- Foto de perfil.

**Datos fiscales:**
- RUT / RFC / NIT / Tax ID segun pais.
- Regimen fiscal.
- Datos bancarios para pago de comisiones (banco, tipo de cuenta, numero).

**Datos de la red:**
- ID de afiliado.
- Fecha de inscripcion.
- Patrocinador directo.
- Posicion en el arbol (pierna izquierda o derecha de quien).
- Rango actual (pagado) y rango maximo historico.
- Estado: Activo / Inactivo / Suspendido / Cancelado.
- PV actual del periodo.
- BV acumulado pierna izquierda y derecha.

### 6.3 Estados del Afiliado

| Estado | Descripcion |
|--------|-------------|
| **Pendiente** | Registro iniciado pero no ha completado la compra del kit. |
| **Activo** | Kit comprado y PV del periodo vigente cumplido. |
| **Inactivo** | No cumplio el PV minimo del periodo. No genera comisiones pero mantiene su posicion. |
| **Suspendido** | Suspension temporal por incumplimiento de politicas. No puede operar. |
| **Cancelado** | Baja definitiva. Su posicion queda "congelada" o se comprime (segun configuracion). |

### 6.4 Auto-envio (Autoship)

- Compra recurrente programada (mensual, tipicamente).
- El afiliado selecciona productos y la fecha de cargo.
- Se procesa automaticamente contra su metodo de pago registrado.
- Si el cargo falla, se reintenta X veces (configurable) y se notifica al afiliado.
- Mantiene al afiliado activo automaticamente.

---

## 7. Modulo de Genealogia (Arbol de Red)

### 7.1 Vistas del Arbol

| Vista | Descripcion |
|-------|-------------|
| **Arbol Binario** | Visualizacion de la estructura binaria (pierna izquierda/derecha). Muestra la posicion de colocacion (placement). |
| **Arbol de Patrocinio** | Visualizacion de quien patrocino a quien (sponsor tree). Puede ser mas amplio que binario (multiples directos). |
| **Vista de Lista** | Listado tabular con filtros y busqueda. |
| **Mapa de Calor** | Visualizacion con colores segun actividad, rango o volumen. |

### 7.2 Informacion Visible por Nodo

- ID y nombre del afiliado.
- Rango actual (icono/color).
- Estado (activo/inactivo).
- PV del periodo.
- BV acumulado en cada pierna (solo relevante en arbol binario).
- Numero de directos activos.
- Fecha de inscripcion.

### 7.3 Funcionalidades

- Navegacion interactiva (zoom, pan, expandir/colapsar nodos).
- Busqueda de afiliado dentro del arbol.
- Filtros por rango, estado, fecha de inscripcion, volumen.
- Indicadores de posiciones vacias en el arbol binario.
- Linea de patrocinio resaltada (path desde un nodo hasta la raiz).

### 7.4 Funciones Administrativas

- Mover afiliado de posicion (con justificacion, aprobacion dual y registro de auditoria).
- Cambiar patrocinador (con las mismas restricciones).
- Inyectar afiliado en una posicion especifica.
- Comprimir nodos cancelados.
- Exportar arbol (PDF, Excel).

---

## 8. Modulo de Productos y Catalogo

### 8.1 Estructura de Producto

| Campo | Descripcion |
|-------|-------------|
| SKU | Codigo unico del producto. |
| Nombre | Nombre comercial. |
| Descripcion | Descripcion detallada y corta. |
| Categoria | Clasificacion (suplementos, cosmeticos, bebidas, etc.). |
| Precio publico | Precio de venta al publico general. |
| Precio distribuidor | Precio para afiliados. |
| BV (Business Volume) | Puntos de volumen de negocio para comisiones. |
| PV (Personal Volume) | Puntos de volumen personal. |
| Peso | Para calculo de envio. |
| Imagenes | Galeria de imagenes del producto. |
| Stock | Cantidad disponible. |
| Estado | Activo / Inactivo / Descontinuado. |
| Pais de disponibilidad | En que paises/mercados esta disponible. |
| Impuestos aplicables | IVA, ISR, etc. segun pais. |

### 8.2 Kits de Inscripcion

- Paquetes predefinidos de productos para nuevos afiliados.
- Cada kit tiene un nivel de entrada diferente (basico, intermedio, premium).
- El nivel del kit puede influir en el rango inicial o en el tope de comisiones del primer periodo.
- Configurables por la administracion.

### 8.3 Promociones y Ofertas

- Descuentos por volumen.
- Productos gratis por alcanzar metas.
- Paquetes promocionales temporales.
- Cupones de descuento.

---

## 9. Modulo de Pedidos y Ventas

### 9.1 Tipos de Pedido

| Tipo | Descripcion |
|------|-------------|
| **Inscripcion** | Primera compra (kit) de un nuevo afiliado. Activa la membresia. |
| **Re-compra / Consumo** | Compra recurrente del afiliado para mantener actividad y/o autoconsumo. |
| **Auto-envio** | Pedido automatico recurrente programado. |
| **Venta a cliente final** | Venta realizada por el afiliado a un consumidor no afiliado (retail). |
| **Pedido administrativo** | Pedido generado por la administracion (ajustes, cortesias, reposiciones). |

### 9.2 Flujo de Pedido

```
Creacion -> Pago Pendiente -> Pago Confirmado -> En Preparacion -> Enviado -> Entregado
                                                                           -> Devuelto (parcial/total)
         -> Cancelado (antes de envio)
```

### 9.3 Campos del Pedido

- Numero de pedido (autogenerado).
- Afiliado comprador.
- Fecha y hora.
- Productos (detalle con cantidad, precio unitario, BV, PV).
- Subtotal, impuestos, descuentos, envio, total.
- BV total del pedido y PV total.
- Metodo de pago.
- Estado del pedido.
- Direccion de envio.
- Numero de seguimiento (tracking).
- Factura asociada.

### 9.4 Reglas de Negocio de Pedidos

- Un pedido de inscripcion **debe** contener al menos un kit de inscripcion.
- El BV y PV del pedido se acreditan al afiliado **solo cuando el pago es confirmado**.
- Las devoluciones generan reverso de BV/PV y, si ya se liquidaron comisiones, se generan debitos en la siguiente liquidacion.
- Politica de devolucion configurable (30, 60, 90 dias, condiciones, excepciones).
- El pedido de auto-envio se genera automaticamente pero el pago puede fallar; en ese caso, el pedido queda en estado "Pago Pendiente" y se reintenta.

---

## 10. Modulo de Comisiones y Liquidacion

### 10.1 Ciclo de Liquidacion

```
Cierre de periodo -> Calculo de volumenes -> Calificacion de rangos -> Calculo de bonos ->
Revision/Aprobacion -> Generacion de liquidacion -> Pago -> Conciliacion
```

### 10.2 Proceso Detallado

1. **Cierre de periodo:** Se congela el snapshot de volumen (BV, PV, GV) al final del periodo.
2. **Calculo de volumenes:**
   - Se suman los BV de todos los pedidos confirmados en el periodo para cada pierna de cada afiliado.
   - Se aplican los carry-overs del periodo anterior.
   - Se calcula el PV personal de cada afiliado.
3. **Calificacion de rangos:**
   - Se evalua el rango de cada afiliado segun la tabla de rangos.
   - Se aplican periodos de gracia si corresponde.
   - Se actualiza el rango pagado.
4. **Calculo de bonos:** Se ejecutan los algoritmos de cada tipo de bono en orden:
   - Bono de patrocinio directo (si no fue pagado inmediatamente).
   - Bono binario.
   - Bono unilevel.
   - Bono de liderazgo (matching).
   - Bonos de rango.
   - Pool global.
5. **Revision y aprobacion:**
   - El sistema genera un reporte previo (pre-liquidacion).
   - El gerente de operaciones o administrador revisa y aprueba.
   - Se pueden hacer ajustes manuales (con justificacion y auditoria).
6. **Generacion de liquidacion:**
   - Se genera el registro de pago para cada afiliado.
   - Se aplican retenciones fiscales si corresponde.
   - Se descuentan deudas, devoluciones pendientes o cargos administrativos.
7. **Pago:**
   - Transferencia bancaria, billetera virtual interna o pasarela de pago.
8. **Conciliacion:**
   - Verificacion de pagos exitosos vs fallidos.
   - Reprocesamiento de pagos fallidos.

### 10.3 Reglas Antifraude en Comisiones

- **Autoconsumo excesivo:** Alertar si un afiliado genera un % desproporcionado del BV de su propia pierna.
- **Cuentas multiples:** Detectar afiliados con datos similares (mismo domicilio, mismo banco, mismo IP de registro).
- **Red fantasma:** Detectar patrones de inscripciones masivas sin actividad posterior.
- **Manipulacion de piernas:** Detectar movimientos inusuales de volumen entre piernas.
- **Tope de ganancias:** Limitar el ratio comisiones/compras personales a un maximo razonable.

### 10.4 Ajustes y Excepciones

- Ajuste manual de comisiones (incremento o decremento) con aprobacion del administrador.
- Bonos especiales / discrecionales.
- Congelamiento temporal de comisiones por investigacion.
- Reverso de comisiones por devolucion de productos.

---

## 11. Modulo de Inventario

### 11.1 Funcionalidades

- Control de stock por producto y por bodega/almacen.
- Alertas de stock bajo (umbral configurable por producto).
- Registro de entradas (compra a proveedor, devolucion de cliente) y salidas (venta, merma, ajuste).
- Lotes y fechas de vencimiento (importante para suplementos y cosmeticos).
- Inventario fisico (conteos periodicos con ajuste).
- Transferencias entre bodegas.

### 11.2 Multi-bodega

- Soporte para multiples puntos de distribucion.
- Cada bodega con su inventario independiente.
- Los pedidos se asignan a la bodega mas cercana o segun reglas configurables.

---

## 12. Modulo de Reportes y Dashboard

### 12.1 Dashboard Ejecutivo

- **Red:** Total de afiliados, nuevas inscripciones del periodo, afiliados activos vs inactivos, distribucion por rango.
- **Ventas:** Ventas totales del periodo, comparativo con periodos anteriores, top productos, ticket promedio.
- **Comisiones:** Total liquidado, promedio por afiliado, top ganadores, ratio comisiones/ventas.
- **Inventario:** Stock critico, valor del inventario, rotacion.
- **Geografico:** Distribucion de la red y ventas por pais/region/ciudad.

### 12.2 Reportes Operativos

| Reporte | Descripcion |
|---------|-------------|
| Listado de afiliados | Filtrable por estado, rango, fecha, patrocinador. Exportable. |
| Reporte de genealogia | Arbol completo o parcial con metricas. |
| Reporte de ventas | Por periodo, producto, afiliado, region. |
| Reporte de comisiones | Detalle por afiliado, tipo de bono, periodo. |
| Reporte de BV/PV | Volumen por afiliado, pierna, acumulado y del periodo. |
| Reporte de inscripciones | Nuevos afiliados por periodo, patrocinador, kit. |
| Reporte de deserciones | Afiliados que pasaron a inactivo o cancelado. |
| Reporte de auto-envios | Estado de auto-envios: activos, fallidos, cancelados. |
| Reporte de inventario | Stock actual, movimientos, valoracion. |
| Reporte fiscal | Retenciones, facturacion, obligaciones por pais. |

### 12.3 Exportacion

- PDF, Excel (XLSX), CSV.

---

## 13. Modulo de Administracion del Sistema

### 13.1 Configuracion General

- Nombre de la empresa, logo, informacion fiscal.
- Moneda base y monedas soportadas (multimoneda).
- Paises/mercados activos.
- Configuracion de periodos de liquidacion (semanal, quincenal, mensual).
- Parametros del plan de compensacion (porcentajes, topes, tabla de rangos).
- Politicas de devolucion.
- Textos legales (terminos, privacidad, contrato).

### 13.2 Gestion de Usuarios Administrativos

- Roles y permisos granulares.
- Registro de actividad por usuario (quien hizo que y cuando).
- Autenticacion de dos factores (2FA) para administradores.

### 13.3 Parametrizacion del Plan de Compensacion

Todo el plan de compensacion debe ser **configurable desde la administracion sin necesidad de modificar codigo**:

- Tabla de rangos y requisitos.
- Porcentajes de cada tipo de bono.
- Topes de ganancias por rango.
- Profundidad del unilevel por rango.
- Generaciones del matching bonus.
- Porcentaje del pool global.
- Reglas de carry-over y flush.
- Reglas de compresion.
- Reglas de derrame (spillover).

### 13.4 Herramientas de Soporte

- Busqueda avanzada de afiliados.
- Simulador de comisiones (what-if).
- Impersonar afiliado (ver el sistema desde su perspectiva, solo lectura).
- Notas internas por afiliado.
- Sistema de tickets / incidencias.

---

## 14. Modulo de Comunicaciones y Notificaciones

### 14.1 Canales

- **Email:** Transaccional (confirmacion de pedido, pago de comision, etc.) y marketing (promociones, noticias).
- **SMS:** Alertas criticas (pago recibido, bono importante).
- **Notificaciones en el portal:** En tiempo real.
- **WhatsApp:** Notificaciones y recordatorios (fase futura).

### 14.2 Eventos de Notificacion

| Evento | Canal Sugerido |
|--------|---------------|
| Nuevo afiliado inscrito en tu red | Email + Portal |
| Pedido confirmado | Email |
| Pago de comision procesado | Email + SMS |
| Rango alcanzado | Email + Portal |
| Auto-envio proximo a procesarse | Email |
| Auto-envio fallido | Email + SMS |
| PV minimo no alcanzado (alerta) | Email + Portal |
| Cambio de estado de cuenta | Email |
| Nueva promocion disponible | Email + Portal |
| Liquidacion aprobada | Portal (admin) |

### 14.3 Plantillas

- Plantillas de email/SMS editables desde la administracion.
- Variables dinamicas (nombre, monto, rango, etc.).
- Soporte multilenguaje.

---

## 15. Modulo de Facturacion e Integraciones Fiscales

### 15.1 Facturacion Electronica

- Generacion automatica de factura al confirmar un pedido.
- Cumplimiento de normativas fiscales por pais:
  - **Colombia:** Facturacion electronica DIAN (resolucion de facturacion, CUFE, XML firmado).
  - **Mexico:** CFDI ante el SAT.
  - **Peru:** Facturacion electronica SUNAT.
  - **Otros paises:** Adaptable segun requerimientos locales.
- Notas credito y notas debito.
- Numeracion secuencial y prefijos por punto de venta.

### 15.2 Retenciones

- Calculo automatico de retenciones sobre comisiones segun el regimen fiscal del afiliado y la normativa del pais.
- Certificados de retencion generables desde el sistema.
- Reporte de retenciones para declaraciones fiscales.

### 15.3 Reportes Fiscales

- Reporte de ventas por periodo para declaracion de IVA/impuestos.
- Reporte de comisiones pagadas (para reportar a la autoridad fiscal como gastos).
- Medios magneticos / informacion exogena (Colombia).

---

## 16. Modulo de Pagos y Billetera Virtual

### 16.1 Billetera Virtual Interna

- Cada afiliado tiene una billetera virtual dentro del sistema.
- Las comisiones se acreditan a la billetera.
- El afiliado puede:
  - **Retirar** a su cuenta bancaria (con monto minimo y cargo por transferencia).
  - **Usar el saldo** para comprar productos (re-compras, auto-envio).
  - **Transferir** saldo a otro afiliado (configurable, con limites).
- Historial de movimientos detallado.

### 16.2 Metodos de Pago para Compras

- Tarjeta de credito/debito.
- Transferencia bancaria.
- Billetera virtual interna.
- Pago en efectivo en punto de distribucion.
- Metodos locales: PSE (Colombia), OXXO (Mexico), PagoEfectivo (Peru), etc.

### 16.3 Metodos de Desembolso de Comisiones

- Transferencia bancaria (ACH, SWIFT).
- Billetera virtual interna (sin costo).
- Terceros de pagos masivos (Payoneer, Paypal — fase futura).

---

## 17. Modulo de Eventos y Capacitaciones

### 17.1 Eventos

- Registro de eventos (convenciones, lanzamientos, conferencias).
- Inscripcion de afiliados a eventos.
- Control de cupos y pagos.
- Reportes de asistencia.

### 17.2 Capacitaciones

- Biblioteca de contenido (videos, documentos, presentaciones).
- Cursos con modulos y seguimiento de progreso.
- Certificaciones internas.
- Vinculacion de capacitaciones con requisitos de rango (fase futura).

---

## 18. Reglas de Negocio Criticas

Estas reglas son **inviolables** y deben ser respetadas por todo el sistema:

1. **Un afiliado, una posicion:** Cada afiliado ocupa exactamente una posicion en el arbol binario. No puede aparecer dos veces.
2. **Sin retroceso de posicion:** Una vez colocado en el arbol, un afiliado no puede ser movido (excepto por administrador con auditoria).
3. **Calificacion antes de comision:** Ningun bono se paga si el afiliado no cumple los requisitos de calificacion del periodo.
4. **BV solo de pedidos pagados:** El volumen de negocio solo se acredita cuando el pago del pedido esta confirmado.
5. **Reverso en devolucion:** Si se devuelve un pedido, se reversa el BV/PV y se ajustan las comisiones correspondientes.
6. **Topes son absolutos:** Los topes de ganancias por rango no pueden ser excedidos por ningun mecanismo.
7. **Patrocinador inmutable:** El patrocinador directo de un afiliado no cambia (salvo proceso administrativo excepcional con multiples aprobaciones).
8. **Integridad del arbol:** Ninguna operacion puede dejar el arbol binario en estado inconsistente (nodos huerfanos, ciclos, etc.).
9. **Auditoria obligatoria:** Toda modificacion manual a datos de red, comisiones o configuracion debe quedar registrada con usuario, fecha, motivo y valores anteriores/nuevos.
10. **Comisiones no editables post-pago:** Una vez que una comision ha sido pagada (desembolsada), no puede ser editada. Solo se pueden generar ajustes (creditos/debitos) en periodos futuros.
11. **Separacion sponsor/placement:** El patrocinador (quien refiere) y la posicion en el arbol binario (donde se coloca) son relaciones independientes y ambas deben mantenerse.
12. **Periodos cerrados son inmutables:** Una vez cerrado y liquidado un periodo, sus datos de volumen y comisiones no pueden alterarse. Cualquier correccion se aplica como ajuste en el periodo siguiente.

---

## 19. Normativas y Compliance

- Cumplimiento de regulaciones de venta directa por pais (ej: Ley 1700/2013 en Colombia).
- Registro ante las camaras de comercio y entes reguladores correspondientes.
- Transparencia en el plan de compensacion (accesible para todos los afiliados).
- Politica de devolucion clara (tipicamente 30 dias con producto sin abrir).
- Prohibicion explicita de esquemas piramidales: el sistema debe demostrar que los ingresos provienen de la venta de productos reales, no solo del reclutamiento.

---

> **Nota:** Este documento contiene las reglas de negocio y funcionamiento operativo del sistema. Los valores numericos (porcentajes, montos, topes) son ejemplos referenciales y deben ser confirmados por la gerencia antes de la implementacion. Las decisiones tecnicas y de arquitectura se documentan por separado.
