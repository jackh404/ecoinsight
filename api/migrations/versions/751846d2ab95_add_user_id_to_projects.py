"""add user_id to projects

Revision ID: 751846d2ab95
Revises: 90c48730fcae
Create Date: 2024-01-02 09:57:01.399060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '751846d2ab95'
down_revision = '90c48730fcae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.UUID(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_projects_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_projects_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###