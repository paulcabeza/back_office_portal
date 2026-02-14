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
6. [Reglas de Negocio Criticas](#6-reglas-de-negocio-criticas)

> Ver tambien: [Detalle de Modulos](modulos.md)

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

- Se destina un porcentaje de las ventas globales de Ganoherb (tipicamente 2%-3%) a un fondo.
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

## 6. Reglas de Negocio Criticas

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

> **Nota:** Este documento contiene las reglas de negocio fundamentales del sistema. Los valores numericos (porcentajes, montos, topes) son ejemplos referenciales y deben ser confirmados por la gerencia antes de la implementacion. El detalle funcional de cada modulo se encuentra en [modulos.md](modulos.md).
