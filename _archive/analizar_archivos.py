import pandas as pd
import json
import sys

def analizar_archivo_excel(ruta_archivo, nombre_archivo):
    print(f"\n=== Analizando {nombre_archivo} ===")
    
    try:
        # Leer todas las hojas del archivo
        todas_las_hojas = pd.read_excel(ruta_archivo, sheet_name=None, nrows=10)
        
        print(f"Hojas encontradas: {list(todas_las_hojas.keys())}")
        
        for nombre_hoja, df in todas_las_hojas.items():
            print(f"\n--- Hoja: {nombre_hoja} ---")
            print(f"Columnas: {list(df.columns)}")
            print(f"Filas de ejemplo (primeras 5):")
            print(df.head().to_string())
            
    except Exception as e:
        print(f"Error al leer {nombre_archivo}: {e}")

if __name__ == "__main__":
    # Analizar archivo de entrada
    analizar_archivo_excel(
        "/Users/brandowleon/Proyecto_Armorum/archivos_ejemplo/ENTRADA_Formato_Cliente.xls",
        "ENTRADA_Formato_Cliente.xls"
    )
    
    # Analizar archivo de salida
    analizar_archivo_excel(
        "/Users/brandowleon/Proyecto_Armorum/archivos_ejemplo/SALIDA_PLANTILLA51_SIMONA.xls",
        "SALIDA_PLANTILLA51_SIMONA.xls"
    )
