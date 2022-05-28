# Crea tarea para ejecutar Agenda
    $Trigger = New-ScheduledTaskTrigger -Daily -At 00:00am
    $Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "C:\Users\juani\Documents\proyectosMERN\salud\turnero-backend\agenda\GeneradorAgenda.ps1"
    Register-ScheduledTask -TaskName "Agenda de turnos" -Trigger $Trigger -Action $Action -RunLevel "Highest" -Force