# Generated by Django 4.2.6 on 2023-11-30 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0002_storedcredential'),
    ]

    operations = [
        migrations.RenameField(
            model_name='storedcredential',
            old_name='user',
            new_name='user_id',
        ),
    ]