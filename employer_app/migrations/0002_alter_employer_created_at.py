# Generated by Django 5.0.6 on 2025-05-04 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
