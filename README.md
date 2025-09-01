# Actas Digitales - Guía para Subir Código a GitHub

Este documento te guiará para subir tus cambios al repositorio correcto en GitHub.

---

### **Causa del Problema Anterior**

El error `Repository not found` significa que la URL del repositorio remoto en tu configuración de Git no existía o era incorrecta. Ahora la vamos a configurar con la dirección correcta.

### **Pasos para Subir el Código (Usando la Nueva URL)**

Sigue estos pasos en tu terminal para conectar y subir tu proyecto al repositorio `https://github.com/luciopablogutierrez/actas-digitales`.

**Paso 1: Actualiza la URL del Repositorio Remoto**

Este comando le dice a Git cuál es la nueva dirección correcta de tu repositorio en GitHub.

```bash
git remote set-url origin https://github.com/luciopablogutierrez/actas-digitales.git
```

**Paso 2: Verifica que la URL se actualizó correctamente**

Ejecuta este comando para asegurarte de que la nueva URL fue guardada.

```bash
git remote -v
```
Deberías ver la URL `https://github.com/luciopablogutierrez/actas-digitales.git` en la salida.

**Paso 3: Sube tus Cambios**

Ahora que la URL es correcta, sube todo tu código a la rama `main` de tu repositorio en GitHub.

```bash
git push -u origin main
```

Si en el futuro quieres subir nuevos cambios, solo necesitarás ejecutar:
1. `git add .`
2. `git commit -m "Tu mensaje de cambios"`
3. `git push origin main`
