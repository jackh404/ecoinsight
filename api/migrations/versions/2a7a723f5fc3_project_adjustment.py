"""project adjustment

Revision ID: 2a7a723f5fc3
Revises: 2cd46d0294b4
Create Date: 2024-01-15 14:05:07.691181

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a7a723f5fc3'
down_revision = '2cd46d0294b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.drop_constraint('uq_projects_title', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_projects_title', ['title'])

    # ### end Alembic commands ###
